/*
  Warnings:

  - You are about to drop the column `email` on the `persona` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Persona_email_key` ON `persona`;

-- AlterTable
ALTER TABLE `persona` DROP COLUMN `email`;
