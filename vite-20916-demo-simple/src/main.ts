export type SomePadding = {
  here: boolean
}

const el1 = document.createElement('button')    
el1.id = 'test-error'
el1.textContent = 'Test error'
document.body.appendChild(el1)
el1.addEventListener('click', () => {
  testError()
})

const el2 = document.createElement('button')    
el2.id = 'test-unhandledrejection'
el2.textContent = 'Test unhandledrejection'
document.body.appendChild(el2)
el2.addEventListener('click', () => {
  testUnhandledRejection()
})

export type AnotherPadding = {
  there: boolean
}

function testError() {
  throw new Error('this is test error')
}

async function testUnhandledRejection() {
  throw new Error('this is test unhandledrejection')
}
