export const requestInitApp = (state) => {
    return state.app.initApp
}
export const requestSiteColor = (state) => {
    return state.siteColor.siteColor
}
export const requestUserSiteColor = (state) => {
    return state.siteColor.userSiteColor
}
export const requestHistoryModal = (state) => {
    return state.modal.historyModalOn
}
export const requestEnterModal = (state) => {
    return state.modal.enterModalOn
}
export const requestRegisterModal = (state) => {
    return state.modal.registerModalOn
}
export const requestRecoveryModal = (state) => {
    return state.modal.recoveryModalOn
}
export const requestColorPickerModal = (state) => {
    return state.modal.colorPickerModalOn
}
export const requestFaqModal = (state) => {
    return state.modal.faqModalOn
}
export const requestAgreeModal = (state) => {
    return state.modal.agreeModalOn
}
export const requestModalMenu = (state) => {
    return state.modal.modalMenuOn
}
export const requestRegNick = (state) => {
    return state.auth.regNick
}
export const requestRegPassword = (state) => {
    return state.auth.regPassword
}
export const requestRegConfirmPassword = (state) => {
    return state.auth.regConfirmPassword
}
export const requestRegEmail = (state) => {
    return state.auth.regEmail
}
export const requestRegisterAgree = (state) => {
    return state.auth.registerAgree
}
export const requestInProgress = (state) => {
    return state.auth.inProgress
}
export const requestRecoveryEmail = (state) => {
    return state.auth.recoveryEmail
}
export const requestEnterEmail = (state) => {
    return state.auth.enterEmail
}
export const requestEnterPassword = (state) => {
    return state.auth.enterPassword
}
export const requestIsAuth = (state) => {
    return state.auth.isAuth
}
export const requestRole = (state) => {
    return state.auth.role
}
export const requestNick = (state) => {
    return state.auth.nick
}
export const requestImg = (state) => {
    return state.auth.img
}
export const requestModalMenuOn = (state) => {
    return state.modal.modalMenuOn
}
export const requestUserNameColor = (state) => {
    return state.siteColor.userNameColor
}
export const requestMessage = (state) => {
    return state.chat.message
}
export const requestOnline = (state) => {
    return state.chat.online
}
export const requestInitChat = (state) => {
    return state.chat.initChat
}
export const requestMessages = (state) => {
    return state.chat.messages
}
export const requestFavoriteGames = (state) => {
    return state.favorite.favoriteGames
}
export const requestGames = (state) => {
    return state.app.games
}
export const requestFavoriteGamesModal = (state) => {
    return state.modal.favoriteGamesModalOn
}
export const requestBalance = (state) => {
    return state.auth.balance
}
export const requestFavoriteGamesCarousel = (state) => {
    return state.favorite.favoriteGamesCarousel
}
export const requestFavoriteGamesCount = (state) => {
    return state.favorite.favoriteGamesCounter
}
export const requestNotify = (state) => {
    return state.notify.notify
}
export const requestFaq = (state) => {
    return state.faq.faq
}
export const requestFaqProgress = (state) => {
    return state.faq.faqProgress
}
export const requestGamesProgress = (state) => {
    return state.app.gamesProgress
}
export const requestNotifyEmpty = (state) => {
    return state.notify.notifyEmpty
}