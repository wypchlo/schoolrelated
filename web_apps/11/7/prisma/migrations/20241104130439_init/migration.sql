-- CreateTable
CREATE TABLE `Wpis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataDodania` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAktualizacji` DATETIME(3) NOT NULL,
    `tutul` VARCHAR(255) NOT NULL,
    `tresc` VARCHAR(191) NULL,
    `opublikowane` BOOLEAN NOT NULL DEFAULT false,
    `autorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kategoria` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komentarz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataDodania` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAktualizacji` DATETIME(3) NOT NULL,
    `autorId` VARCHAR(191) NOT NULL,
    `tresc` VARCHAR(191) NULL,

    UNIQUE INDEX `Komentarz_autorId_key`(`autorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
