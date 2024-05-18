declare module 'xss-clean';

/**
* Sanitizes the provided string against XSS vulnerabilities.
*
* @param str The string to sanitize.
* @returns The sanitized string.
*/
declare function xss(str: string): string;