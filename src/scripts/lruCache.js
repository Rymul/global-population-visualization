import LRU from 'lru-cache';

export const initLRUCache = () => {
    const config = { max: 2 };
    const cache = new LRU(config);

    return cache;
};