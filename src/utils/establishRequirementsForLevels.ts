import LevelRequirementsIterface from "../data/level-requirements-interface"

export const establichRequirementsForLevels = (requirements: LevelRequirementsIterface, level_nr: number) => {

    switch (level_nr) {

        case 1:

            requirements.requiredWords = 0;
            requirements.wordsAfterLevel = 5;
            requirements.requiredPoints = 0;
            requirements.requiredTests = 0;
            requirements.requiredEfficiency = 0;
            break;

        case 2:

            requirements.requiredWords = 5;
            requirements.wordsAfterLevel = 20;
            requirements.requiredPoints = 60;
            requirements.requiredTests = 0;
            requirements.requiredEfficiency = 50;
            break;
            

        case 3:
            
            requirements.requiredWords = 20;
            requirements.wordsAfterLevel = 50;
            requirements.requiredPoints = 500;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 52
            break;

        case 4:
            
            requirements.requiredWords = 50;
            requirements.wordsAfterLevel = 90;
            requirements.requiredPoints = 1000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 54
            break;

        case 5:

            requirements.requiredWords = 90;
            requirements.wordsAfterLevel = 140;
            requirements.requiredPoints = 2000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 56
            break;

        case 6:

            requirements.requiredWords = 140;
            requirements.wordsAfterLevel = 200;
            requirements.requiredPoints = 3500;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 58
            break;

        case 7:

            requirements.requiredWords = 200;
            requirements.wordsAfterLevel = 270;
            requirements.requiredPoints = 5500;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 60
            break;
        case 8:

            requirements.requiredWords = 270;
            requirements.wordsAfterLevel = 350;
            requirements.requiredPoints = 8000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 62
            break;

        case 9:

            requirements.requiredWords = 350;
            requirements.wordsAfterLevel = 440;
            requirements.requiredPoints = 11000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 64
            break;

        case 10:

            requirements.requiredWords = 440;
            requirements.wordsAfterLevel = 550;
            requirements.requiredPoints = 14000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 66
            break;

        case 11:

            requirements.requiredWords = 550;
            requirements.wordsAfterLevel = 680;
            requirements.requiredPoints = 18000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 68
            break;

        case 12:

            requirements.requiredWords = 680;
            requirements.wordsAfterLevel = 840;
            requirements.requiredPoints = 23000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 70
            break;

        case 13:

            requirements.requiredWords = 840;
            requirements.wordsAfterLevel = 1050;
            requirements.requiredPoints = 27000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 72
            break;

        case 14:

            requirements.requiredWords = 1050;
            requirements.wordsAfterLevel = 1280;
            requirements.requiredPoints = 32000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 74
            break;

        case 15:

            requirements.requiredWords = 1280;
            requirements.wordsAfterLevel = 1530;
            requirements.requiredPoints = 42000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 76
            break;

        case 16:

            requirements.requiredWords = 1530;
            requirements.wordsAfterLevel = 1800;
            requirements.requiredPoints = 52000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 78
            break;

        case 17:

            requirements.requiredWords = 1800;
            requirements.wordsAfterLevel = 2100;
            requirements.requiredPoints = 64000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 80
            break;

        case 18:

            requirements.requiredWords = 2100;
            requirements.wordsAfterLevel = 2430;
            requirements.requiredPoints = 80000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 82
            break;

        case 19:

            requirements.requiredWords = 2430;
            requirements.wordsAfterLevel = 2800;
            requirements.requiredPoints = 100000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 84
            break;

        case 20:

            requirements.requiredWords = 2800;
            requirements.wordsAfterLevel = 3000;
            requirements.requiredPoints = 150000;
            requirements.requiredTests = level_nr - 2;
            requirements.requiredEfficiency = 86
            break;
    }
}