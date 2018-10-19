
let kalmanFilter = new KalmanFilter({R: 0.01, Q: 3})
let filtered = []
let notFiltered = []

function setup() {
  for (let i = 0; i < 100; i++) {
    let number = random(0, 100)
    let result = kalmanFilter.filter(number)
    filtered.push(result)
    notFiltered.push(number)
  }

  console.log(filtered)
  console.log(notFiltered)
}

