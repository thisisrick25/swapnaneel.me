/*
  Warnings:

  - The primary key for the `View` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `View` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `View` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "View" DROP CONSTRAINT "View_pkey",
DROP COLUMN "id",
DROP COLUMN "views",
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "View_pkey" PRIMARY KEY ("slug");
