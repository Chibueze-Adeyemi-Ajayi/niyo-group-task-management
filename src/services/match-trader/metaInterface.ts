export interface IMatchTrader {
    offerId: string, // cannot be null
    email: string, // cannot be null
    password: string, // cannot be null, minimum 8 characters
    partnerId: string, // cannot be null
    name: string,
    country: string,
    parentTradingAccountUuid?: string, // optional id of parent account
    surname: string,
    dateOfBirth: string, // YYYY-MM-DD format
    phone: string,
    city : string,
    postCode: string,
    address: string,
    state: string
}