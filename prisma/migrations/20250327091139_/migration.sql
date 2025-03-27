-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "history" TEXT,
    "age" INTEGER,
    "health" INTEGER,
    "stamina" INTEGER,
    "mana" INTEGER,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
