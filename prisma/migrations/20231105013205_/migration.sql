/*
  Warnings:

  - Added the required column `attendance` to the `EventAttendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secret` to the `EventAttendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventAttendance" ADD COLUMN     "attendance" BOOLEAN NOT NULL,
ADD COLUMN     "secret" BOOLEAN NOT NULL;
