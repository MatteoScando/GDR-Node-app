-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "history" TEXT,
    "age" INTEGER,
    "health" INTEGER DEFAULT 100,
    "stamina" INTEGER DEFAULT 100,
    "mana" INTEGER DEFAULT 100,
    "idRace" TEXT NOT NULL,
    "idClass" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(20) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "modHealth" INTEGER NOT NULL,
    "modStamina" INTEGER NOT NULL,
    "modMana" INTEGER NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaceAttrMod" (
    "idRace" TEXT NOT NULL,
    "idAttribute" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "RaceAttrMod_pkey" PRIMARY KEY ("idRace","idAttribute")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(20) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "value" INTEGER DEFAULT 20,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "key" VARCHAR(20) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassSkillMod" (
    "idSkill" TEXT NOT NULL,
    "idClass" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "ClassSkillMod_pkey" PRIMARY KEY ("idSkill","idClass")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "key" VARCHAR(20) NOT NULL,
    "value" INTEGER DEFAULT 10,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_idRace_fkey" FOREIGN KEY ("idRace") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_idClass_fkey" FOREIGN KEY ("idClass") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceAttrMod" ADD CONSTRAINT "RaceAttrMod_idRace_fkey" FOREIGN KEY ("idRace") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceAttrMod" ADD CONSTRAINT "RaceAttrMod_idAttribute_fkey" FOREIGN KEY ("idAttribute") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSkillMod" ADD CONSTRAINT "ClassSkillMod_idSkill_fkey" FOREIGN KEY ("idSkill") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSkillMod" ADD CONSTRAINT "ClassSkillMod_idClass_fkey" FOREIGN KEY ("idClass") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
