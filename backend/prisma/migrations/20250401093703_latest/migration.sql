/*
  Warnings:

  - Added the required column `idAttribute` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('ADMIN', 'GUEST');

-- DropForeignKey
ALTER TABLE "ClassSkillMod" DROP CONSTRAINT "ClassSkillMod_idClass_fkey";

-- DropForeignKey
ALTER TABLE "ClassSkillMod" DROP CONSTRAINT "ClassSkillMod_idSkill_fkey";

-- DropForeignKey
ALTER TABLE "RaceAttrMod" DROP CONSTRAINT "RaceAttrMod_idAttribute_fkey";

-- DropForeignKey
ALTER TABLE "RaceAttrMod" DROP CONSTRAINT "RaceAttrMod_idRace_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "idAttribute" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "USER_ROLE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionId_key" ON "Session"("sessionId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceAttrMod" ADD CONSTRAINT "RaceAttrMod_idRace_fkey" FOREIGN KEY ("idRace") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceAttrMod" ADD CONSTRAINT "RaceAttrMod_idAttribute_fkey" FOREIGN KEY ("idAttribute") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSkillMod" ADD CONSTRAINT "ClassSkillMod_idSkill_fkey" FOREIGN KEY ("idSkill") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSkillMod" ADD CONSTRAINT "ClassSkillMod_idClass_fkey" FOREIGN KEY ("idClass") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_idAttribute_fkey" FOREIGN KEY ("idAttribute") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
