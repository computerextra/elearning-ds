import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Text =
  "Quies *iam* Solis munera vitasset infixum defessa **patet magis**, non servati \n \
oscula induruit urimur. Patrium flumina. Erit est herbis pendeat, de \n \
*Iphitiden*, orbem candore Ulixem.";

const wpm = 225;
const words = Text.trim().split(/\s+/).length;
const time = Math.ceil(words / wpm);

async function main() {
  const mockInfo_1 = await prisma.info.upsert({
    where: { id: "cm6rmv68h00000ckvdfavhfy0" },
    update: {},
    create: {
      id: "cm6rmv68h00000ckvdfavhfy0",
      body: Text,
      readtime: time.toString(),
      description: "This is a Mock Article",
      name: "Mock Article 1",
    },
  });

  const mockInfo_2 = await prisma.info.upsert({
    where: { id: "cm6rn2ljp00000cjxhzy0glyt" },
    update: {},
    create: {
      id: "cm6rn2ljp00000cjxhzy0glyt",
      body: Text,
      readtime: time.toString(),
      description: "This is a Mock Article",
      name: "Mock Article 2",
    },
  });

  const mockInfo_3 = await prisma.info.upsert({
    where: { id: "cm6rn2pvu00010cjx1u9pg0kt" },
    update: {},
    create: {
      id: "cm6rn2pvu00010cjx1u9pg0kt",
      body: Text,
      readtime: time.toString(),
      description: "This is a Mock Article",
      name: "Mock Article 3",
    },
  });

  const mockInfo_4 = await prisma.info.upsert({
    where: { id: "cm6rn2t9n00020cjxdfcbbdzf" },
    update: {},
    create: {
      id: "cm6rn2t9n00020cjxdfcbbdzf",
      body: Text,
      readtime: time.toString(),
      description: "This is a Mock Article",
      name: "Mock Article 4",
    },
  });

  const mockInfo_5 = await prisma.info.upsert({
    where: { id: "cm6rn2w3g00030cjx3wgzdis7" },
    update: {},
    create: {
      id: "cm6rn2w3g00030cjx3wgzdis7",
      body: Text,
      readtime: time.toString(),
      description: "This is a Mock Article",
      name: "Mock Article 5",
    },
  });

  const mockInfo_6 = await prisma.info.upsert({
    where: { id: "cm6rn35dw00040cjx4xaxd29i" },
    update: {},
    create: {
      id: "cm6rn35dw00040cjx4xaxd29i",
      body: Text,
      readtime: time.toString(),
      description: "This is a Mock Article",
      name: "Mock Article 6",
    },
  });

  console.log({
    mockInfo_1,
    mockInfo_2,
    mockInfo_3,
    mockInfo_4,
    mockInfo_5,
    mockInfo_6,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
