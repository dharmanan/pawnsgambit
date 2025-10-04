import React from 'react';
import { useTranslation } from 'react-i18next';
import type { GameStats } from '../types';
import { ACHIEVEMENT_LEVELS } from '../scoring';
// ...existing code...

interface StatsPanelProps {
    stats: GameStats;
    unlockedBadges: boolean[][];
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, unlockedBadges }) => {
    const { t } = useTranslation();
    const { gamesWon, totalScore, gamesPlayed, highScore, achievementsByLevel } = stats;
    const averageScore = gamesPlayed > 0 ? Math.round(totalScore / gamesPlayed) : 0;

    // Rozet gridini oluştur
    // achievementsByLevel: { [level: number]: string[] }
    // unlockedBadges Sidebar'dan geliyor

    return (
    <div className="p-4 bg-black/20 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3 text-yellow-300 border-b-2 border-yellow-400/50 pb-2 text-center">{t('stats.title')}</h3>
            <div className="grid grid-cols-3 gap-6 text-lg mb-4">
                <div className="flex flex-col justify-between items-center h-24 bg-black/10 border border-yellow-300 rounded-xl shadow-md py-2">
                    <span className="font-extrabold text-sm sm:text-base text-yellow-600 mb-2 text-center whitespace-normal break-words min-h-[2.2em] flex items-center justify-center">{t('stats.won')}</span>
                    <span className="text-3xl font-bold text-green-700 text-center">{gamesWon}</span>
                </div>
                <div className="flex flex-col justify-between items-center h-24 bg-black/10 border border-yellow-300 rounded-xl shadow-md py-2">
                    <span className="font-extrabold text-sm sm:text-base text-yellow-600 mb-2 text-center whitespace-normal break-words min-h-[2.2em] flex items-center justify-center">{t('stats.avgScore')}</span>
                    <span className="text-3xl font-bold text-green-700 text-center">{averageScore}</span>
                </div>
                <div className="flex flex-col justify-between items-center h-24 bg-black/10 border border-yellow-300 rounded-xl shadow-md py-2">
                    <span className="font-extrabold text-sm sm:text-base text-yellow-600 mb-2 text-center whitespace-normal break-words min-h-[2.2em] flex items-center justify-center">{t('stats.highScore')}</span>
                    <span className="text-3xl font-bold text-green-700 text-center">{highScore}</span>
                </div>
            </div>
            {/* Rozet grid - badges paneli gibi alt alta 3 seviye, her seviyede yatayda 3 rozet ve isimleri */}
            <div className="flex flex-col gap-4 mt-4">
                {[2, 1, 0].map(level => (
                    <div key={level} className="bg-black/10 border border-yellow-300 rounded-2xl shadow-md py-4 px-2 flex flex-col items-center">
                        <span className="font-extrabold text-xl mb-2 text-yellow-500 drop-shadow text-center tracking-wide uppercase">{t('level') + ' ' + (level + 1)}</span>
                        <div className="flex flex-row gap-8 justify-center items-end mb-1">
                            {[0, 1, 2].map(badge => (
                                <div key={badge} className="flex flex-col items-center justify-between h-40 sm:h-40 h-44 w-24 sm:w-32">
                                    <div
                                        className={`transition-all duration-150 rounded-full border-2 p-2 bg-transparent shadow ${unlockedBadges[level][badge] ? 'border-green-400' : 'border-gray-400 opacity-50'} `}
                                        title={t(`achievements.${ACHIEVEMENT_LEVELS[badge].identifier}.name`)}
                                    >
                                        <img
                                            src={`/badges/${(2 - level) * 3 + badge}.png`}
                                            alt={t(`achievements.${ACHIEVEMENT_LEVELS[badge].identifier}.name`)}
                                            className={`w-20 h-20 object-contain ${unlockedBadges[level][badge] ? '' : 'opacity-50 grayscale'}`}
                                        />
                                    </div>
                                    <span className={`mt-3 text-sm sm:text-base font-bold text-center min-h-[2.5em] sm:min-h-[2.2em] flex items-center justify-center break-words whitespace-normal ${unlockedBadges[level][badge] ? 'text-green-700' : 'text-gray-400'}`}>{t(`achievements.${ACHIEVEMENT_LEVELS[badge].identifier}.name`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ...existing code...
export default StatsPanel;