declare module 'validator';

/**
* Sanitizes the provided string against XSS vulnerabilities.
*
* @param str The string to sanitize.
* @returns The sanitized string.
*/
declare function validator(str: string): string;