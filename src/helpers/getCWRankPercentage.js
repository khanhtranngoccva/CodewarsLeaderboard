export default function getCWLevelPercentage(level, score) {
    const threshold = {
        [-8]: 0,
        [-7]: 20,
        [-6]: 76,
        [-5]: 229,
        [-4]: 643,
        [-3]: 1768,
        [-2]: 4829,
        [-1]: 13147,
        [1]: 35759,
        [2]: 97225,
    };
    let nextLevel;
    if (level === -1) {
        nextLevel = 1;
    } else {
        nextLevel = level + 1;
    }
    const lowThreshold = threshold[level];
    // Level does not exist.
    if (lowThreshold === undefined) {
        throw new Error("Level does not exist.");
    }
    const highThreshold = threshold[nextLevel];
    // Max level.
    if (highThreshold === undefined) {
        return 1;
    } else {
        return (score - lowThreshold) / (highThreshold - lowThreshold);
    }
}