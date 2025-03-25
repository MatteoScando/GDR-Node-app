-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "history" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "stamina" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
