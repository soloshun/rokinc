/**
 * Google Sheets + Drive as a zero-cost CMS.
 *
 * Sheets: the spreadsheet must be shared "Anyone with the link can view".
 * We read it through the gviz JSON endpoint — no API key needed.
 *
 * Drive: each project has a folder of images inside a root "Projects" folder.
 * Listing folders requires a (free) Google API key with the Drive API enabled.
 *
 * Env vars (all optional — the site falls back to sample content without them):
 *   ROKINC_SHEET_ID              spreadsheet id from its URL
 *   GOOGLE_API_KEY               API key with Drive API enabled
 *   ROKINC_DRIVE_PROJECTS_FOLDER id of the Drive folder that contains one subfolder per project
 */

const SHEET_ID = process.env.ROKINC_SHEET_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const PROJECTS_FOLDER = process.env.ROKINC_DRIVE_PROJECTS_FOLDER;

export const REVALIDATE_SECONDS = 300;

export function sheetsConfigured() {
  return Boolean(SHEET_ID);
}

export function driveConfigured() {
  return Boolean(API_KEY && PROJECTS_FOLDER);
}

/** Read one tab of the spreadsheet as an array of row objects keyed by header. */
export async function readSheet(
  sheetName: string
): Promise<Record<string, string>[]> {
  if (!SHEET_ID) return [];
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&headers=1`;
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) return [];
  const text = await res.text();
  // gviz wraps JSON in: google.visualization.Query.setResponse({...});
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return [];
  try {
    const data = JSON.parse(text.slice(start, end + 1));
    const cols: string[] = data.table.cols.map(
      (c: { label?: string; id: string }) => (c.label || c.id).trim()
    );
    return data.table.rows.map((r: { c: ({ v?: unknown; f?: string } | null)[] }) => {
      const row: Record<string, string> = {};
      cols.forEach((label, i) => {
        const cell = r.c[i];
        // Prefer the formatted value (dates come back as "Date(2026,7,15)" otherwise)
        row[label] = cell == null ? "" : String(cell.f ?? cell.v ?? "");
      });
      return row;
    });
  } catch {
    return [];
  }
}

type DriveFile = { id: string; name: string; mimeType: string };

async function listDriveFolder(folderId: string): Promise<DriveFile[]> {
  if (!API_KEY) return [];
  const q = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&key=${API_KEY}&fields=files(id,name,mimeType)&pageSize=200&orderBy=name`;
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.files ?? [];
}

/** Public, CDN-cached URL for a Drive image. */
export function driveImageUrl(fileId: string, width = 1600) {
  return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
}

/**
 * Map of project folder name -> image URLs (cover.jpg first when present),
 * read from the Drive "Projects" root folder.
 */
export async function readProjectImageFolders(): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>();
  if (!driveConfigured()) return map;
  const folders = (await listDriveFolder(PROJECTS_FOLDER!)).filter(
    (f) => f.mimeType === "application/vnd.google-apps.folder"
  );
  await Promise.all(
    folders.map(async (folder) => {
      const files = (await listDriveFolder(folder.id)).filter((f) =>
        f.mimeType.startsWith("image/")
      );
      files.sort((a, b) =>
        a.name.toLowerCase().startsWith("cover")
          ? -1
          : b.name.toLowerCase().startsWith("cover")
            ? 1
            : a.name.localeCompare(b.name)
      );
      map.set(
        folder.name,
        files.map((f) => driveImageUrl(f.id))
      );
    })
  );
  return map;
}
