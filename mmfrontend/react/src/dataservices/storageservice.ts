type StorageMethod = 'Local' | 'Session';

class StorageService {

    /**
     * Stores the specified value against the given key in local/session storage.
     * @param key 
     * @param value 
     * @param method 
     */
    public static storeItem(key: string, value: any, method?: StorageMethod): void {
        if (method && method === 'Session') {
            sessionStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, value);
        }
    }

    /**
     * Retrieves the value for the mentioned key from local/session storage.
     * @param key 
     * @param method 
     */
    public static retrieveItem(key: string, method?: StorageMethod): any {
        if (method && method === 'Session') {
            return sessionStorage.getItem(key);
        } else {
            return localStorage.getItem(key);
        }
    }

    /**
     * Clears value for the stored item with the given key in local/session storage.
     * @param key 
     * @param method 
     */
    public static clearItem(key: string, method?: StorageMethod): void {
        if (method && method === 'Session') {
            sessionStorage.setItem(key, '');
        } else {
            localStorage.setItem(key, '');
        }
    }

    /**
     * Completely clears the session/local storage.
     * @param method 
     */
    public static clearStorgae(method?: StorageMethod): void {
        if (method && method === 'Session') {
            sessionStorage.clear();
        } else {
            localStorage.clear();
        }
    }
}

export default StorageService;