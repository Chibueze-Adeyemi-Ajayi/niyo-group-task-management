declare module 'hpp';

/**
* Sanitizes the provided string against XSS vulnerabilities.
*
* @param str The string to sanitize.
* @returns The sanitized string.
*/
declare function hpp(str: string): string;