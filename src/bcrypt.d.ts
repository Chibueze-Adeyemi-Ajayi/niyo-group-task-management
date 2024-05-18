declare module 'bcryptjs';

/**
* Helps to hash string.
*
* @param str The string to hash.
* @returns The Hashed string.
*/
declare function bcrypt(str: string): string;