/**
 * Official ROKinc language. The mission statement and program descriptions
 * are the CEO's exact words — do not edit them here without her approval.
 */

export const ORG = {
  name: "ROKinc",
  fullName: "Rosemary Ohenewaa Kwaning Inc.",
  tagline: "Creating change in humanity through the love of Christ.",
};

export const MISSION_STATEMENT =
  "Rosemary Ohenewaa Kwaning Inc. (ROKinc) is a Christian nonprofit organization committed to creating change in humanity through the love of Christ. We fulfill this mission by proclaiming the gospel, providing compassionate assistance to vulnerable populations, and equipping young people with the spiritual, educational, and leadership resources needed to thrive.";

export type Program = {
  slug: string;
  kicker: string;
  title: string;
  verse?: string;
  /** CEO's exact words. */
  body: string;
};

export const PROGRAMS: Program[] = [
  {
    slug: "visiting-jesus",
    kicker: "A",
    title: "The Visiting Jesus Project",
    verse: "Matthew 25:42–43",
    body: "The Visiting Jesus Project is inspired by Matthew 25:42–43, in which Jesus identifies Himself with people who are hungry, thirsty, displaced, inadequately clothed, sick, or imprisoned. In response to this biblical mandate, ROKinc visits correctional facilities, hospitals, rehabilitation centers, and communities experiencing homelessness to provide prayer, encouragement, humanitarian assistance, and the love of Christ. The project also reaches high schools and colleges, where ROKinc inspires and equips young people to pursue purposeful and responsible lives.",
  },
  {
    slug: "widows-and-orphans",
    kicker: "B",
    title: "ROKinc Missions: Widows and Orphans Outreach",
    body: "The Widows and Orphans Outreach is a central component of ROKinc’s missionary work. Through annual outreaches in Ghana and other communities as opportunities arise, ROKinc provides vulnerable widows and orphaned children with clothing, educational materials, health education, medical support, food, and other practical assistance. These outreaches demonstrate the love of Christ while creating opportunities to proclaim the gospel and share the finished work of Jesus Christ on the cross. ROKinc also collaborates with local churches to provide follow-up discipleship and sustained spiritual support.",
  },
  {
    slug: "high-school-missions",
    kicker: "C",
    title: "ROKinc High School Missions",
    body: "ROKinc High School Missions brings the gospel to young people within their educational environments. The program provides students with educational resources, leadership development, purpose-discovery sessions, and ongoing mentorship. Through this initiative, ROKinc seeks to nurture spiritually grounded, confident, and responsible young leaders who are prepared to positively influence their schools, families, communities, and future professions.",
  },
];

/** Matthew 25:35–36 lines that anchor the Visiting Jesus story. */
export const MATTHEW_LINES = [
  { text: "I was hungry, and you gave me food.", word: "hungry" },
  { text: "I was thirsty, and you gave me drink.", word: "thirsty" },
  { text: "I was a stranger, and you took me in.", word: "a stranger" },
  { text: "I was naked, and you clothed me.", word: "naked" },
  { text: "I was sick, and you visited me.", word: "sick" },
  { text: "I was in prison, and you came to me.", word: "in prison" },
];
