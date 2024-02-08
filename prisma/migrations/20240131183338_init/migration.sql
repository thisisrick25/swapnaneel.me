-- CreateTable
CREATE TABLE "View" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(225) NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);
