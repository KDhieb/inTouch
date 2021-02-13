export { default as Home } from './Home/Home';
export { default as Dashboard } from './Dashboard/Dashboard';
export { default as Interests } from './Interests/Interests';
export { default as Profile } from './Profile/Profile';
export { default as SignIn } from './SignIn/SignIn';
export { default as Friends } from './Friends/Friends';

const {google} = require('googleapis')
const {OAuth2} = google.auth
const oAuth2Client = new OAuth2(
    '1055638109604-dr88ocr8sd581nivgfa6bpn7rci55j17.apps.googleusercontent.com',
    'l-KYw0RGWwwGb3Wp0CCUtj4_'
)

oAuth2Client.setCredentials({
    refresh_token:
        '1//04q1cuFYkAorFCgYIARAAGAQSNwF-L9Ir9vwV8UZImtGOmnzJO5pwG4rPlVUA5Fg4mB6VOK_6OTuS-NYsDB4tIawQMnMng1HDmk4'
})

const calendar = google.calendar({version:'v3', auth: oAuth2Client})