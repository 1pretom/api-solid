export class LatePresenceValidateError extends Error {
    constructor(){
        super("Should not validate presence because of it has passed 20 minutes.")
    }
}