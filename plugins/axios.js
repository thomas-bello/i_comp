export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    // config.baseURL = process.env.BASE_URL
    console.log('process.env.BASE_URL', process.env.BASE_URL)
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const { status: code } = error.response || {}
    console.log('code', code)
    if (code === 400) {
      redirect('/400')
    }
  })
}
