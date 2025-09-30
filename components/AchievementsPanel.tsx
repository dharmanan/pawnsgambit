import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ACHIEVEMENT_LEVELS } from '../scoring';
import { CharacterIcon } from './Characters';

interface AchievementsPanelProps {
    unlocked: boolean[][]; // [seviye][başarı] unlocked
    onMint: (level: number, badge: number) => void;
}

const badgeNames = [
    'Bilgin', 'Zeki', 'Kurnaz', // Seviye 1
    'Bilgin', 'Zeki', 'Kurnaz', // Seviye 2
    'Bilgin', 'Zeki', 'Kurnaz', // Seviye 3
];

const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ unlocked, onMint }) => {
    const [modal, setModal] = useState<{ level: number; badge: number } | null>(null);

    // Güvenli unlocked dizisi: undefined veya eksikse 3x3 false ile doldur
    const safeUnlocked = Array.isArray(unlocked) && unlocked.length === 3
        ? unlocked.map(row => Array.isArray(row) && row.length === 3 ? row : [false, false, false])
        : [[false, false, false], [false, false, false], [false, false, false]];

    const { t } = useTranslation();
    return (
        <div className="w-full max-w-2xl mx-auto mt-6">
            <h2 className="text-2xl font-bold text-center mb-6 tracking-wide text-yellow-400 drop-shadow-lg">{t('sidebar.tabs.badges')}</h2>
            <div className="flex flex-col gap-8">
                {[2, 1, 0].map(level => (
                    <div key={level} className="bg-black/10 border border-yellow-300 rounded-2xl shadow-md py-6 px-2 flex flex-col items-center">
                        <span className="font-extrabold text-xl mb-4 text-yellow-500 drop-shadow text-center tracking-wide uppercase">{t('level') + ' ' + (level + 1)}</span>
                        <div className="flex flex-row gap-10 justify-center items-end mb-2">
                            {[0, 1, 2].map(badge => (
                                <div key={badge} className="flex flex-col items-center">
                                    <button
                                        className={`transition-all duration-150 rounded-full border-4 p-2 bg-transparent shadow-lg ${safeUnlocked[level][badge] ? 'border-green-400' : 'border-gray-300 opacity-50'} hover:scale-105`}
                                        onClick={() => setModal({ level, badge })}
                                        disabled={!safeUnlocked[level][badge]}
                                        title={t(`achievements.${ACHIEVEMENT_LEVELS[badge].identifier}.name`)}
                                    >
                                        <img
                                            src={`/badges/${(2 - level) * 3 + badge}.png`}
                                            alt={t(`achievements.${ACHIEVEMENT_LEVELS[badge].identifier}.name`)}
                                            className={`w-24 h-24 object-contain ${safeUnlocked[level][badge] ? '' : 'opacity-50 grayscale'}`}
                                        />
                                    </button>
                                    <span className={`mt-3 text-base font-bold text-center ${safeUnlocked[level][badge] ? 'text-green-700' : 'text-gray-400'}`}>{t(`achievements.${ACHIEVEMENT_LEVELS[badge].identifier}.name`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center">
                        <img
                            src={`/badges/${(2 - modal.level) * 3 + modal.badge}.png`}
                            alt={badgeNames[(2 - modal.level) * 3 + modal.badge]}
                            className="w-40 h-40 object-contain mb-4"
                        />
                        <span className="font-bold text-lg mb-2">{badgeNames[modal.level * 3 + modal.badge]}</span>
                        {safeUnlocked[modal.level][modal.badge] ? (
                          <button
                              className="bg-gradient-to-b from-green-500 to-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 transition mb-2"
                              onClick={() => { onMint(modal.level, modal.badge); setModal(null); }}
                          >
                              {t('mint')}
                          </button>
                        ) : (
                          <span className="text-gray-400 font-bold mb-2">Bu rozet henüz açılmadı!</span>
                        )}
                        <button
                            className="text-gray-500 mt-2 underline text-sm"
                            onClick={() => setModal(null)}
                        >
                            {t('close')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AchievementsPanel;