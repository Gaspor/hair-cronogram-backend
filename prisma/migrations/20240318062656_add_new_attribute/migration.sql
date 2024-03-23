/*
  Warnings:

  - Added the required column `plainTextPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "plainTextPassword" TEXT NOT NULL;
