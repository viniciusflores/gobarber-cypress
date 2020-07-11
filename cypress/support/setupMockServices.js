const setupMockServices = () => {
  cy.server()
  cy.route({
    method: 'POST',
    url: '/sessions',
    response: {
      token: 'token_mocked',
      user: {
        avatar: 'no_avatar',
        avatar_url:
          'https://upload.wikimedia.org/wikipedia/pt/c/cc/A_Bug%27s_Life.jpg',
        created_at: '2020-06-28T00:37:14.300Z',
        email: 'mocked_mail@email.com',
        id: '123',
        name: 'Mocked User',
        updated_at: '2020-07-01T21:12:29.523Z',
      },
    },
  }).as('signin')

  cy.route({
    method: 'GET',
    url: '/providers/*/month-availability*',
    headers: {
      authorization: 'token_mocked',
    },
    response: [
      { day: 1, available: false },
      { day: 2, available: false },
      { day: 3, available: false },
      { day: 4, available: false },
      { day: 5, available: false },
      { day: 6, available: false },
      { day: 7, available: false },
      { day: 8, available: true },
      { day: 9, available: true },
      { day: 10, available: true },
      { day: 11, available: true },
      { day: 12, available: true },
      { day: 13, available: true },
      { day: 14, available: true },
      { day: 15, available: true },
      { day: 16, available: true },
      { day: 17, available: true },
      { day: 18, available: true },
      { day: 19, available: true },
      { day: 20, available: true },
      { day: 21, available: true },
      { day: 22, available: true },
      { day: 23, available: true },
      { day: 24, available: true },
      { day: 25, available: true },
      { day: 26, available: true },
      { day: 27, available: true },
      { day: 28, available: true },
      { day: 29, available: true },
      { day: 30, available: true },
      { day: 31, available: true },
    ],
  }).as('availability-month')

  cy.route({
    method: 'GET',
    url: 'appointments/me*',
    headers: {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTQyMzU5NTcsImV4cCI6MTU5NDMyMjM1Nywic3ViIjoiNjVlNzFhODctMmQ4Zi00ZGRjLThiMWMtMWRmMWQ5ZWMxZGNkIn0.ZOZVGNdHs6IEaHMkr6ywjDWk7n-gKg-hoXHAUqrOSUA',
    },
    response: [
      {
        id: '609d99e4-89bc-46e1-876f-f75519692fa6',
        provider_id: '9bf13882-d5e5-4a46-989e-75c392f5353f',
        user_id: '30a94837-9685-45cc-b36d-d9a944a11d72',
        user: {
          id: '30a94837-9685-45cc-b36d-d9a944a11d72',
          name: 'Vinicius',
          email: 'Vinicius6800@email.com',
          avatar: null,
          created_at: '2020-06-27T20:33:29.872Z',
          updated_at: '2020-06-27T20:33:29.872Z',
          avatar_url: null,
        },
        date: '2020-07-08T10:00:00.000Z',
        created_at: '2020-07-08T19:38:47.213Z',
        updated_at: '2020-07-08T19:38:47.213Z',
      },
      {
        id: '00aa99f1-50d9-4ff9-917c-9cedaff802e5',
        provider_id: '9bf13882-d5e5-4a46-989e-75c392f5353f',
        user_id: '30a94837-9685-45cc-b36d-d9a944a11d72',
        user: {
          id: '30a94837-9685-45cc-b36d-d9a944a11d72',
          name: 'Vinicius',
          email: 'Vinicius6800@email.com',
          avatar: null,
          created_at: '2020-06-27T20:33:29.872Z',
          updated_at: '2020-06-27T20:33:29.872Z',
          avatar_url: null,
        },
        date: '2020-07-08T15:00:00.000Z',
        created_at: '2020-07-08T19:38:55.785Z',
        updated_at: '2020-07-08T19:38:55.785Z',
      },
    ],
  }).as('personal-appointments')

  cy.route({
    method: 'POST',
    url: 'users',
    response: {
      id: '123',
      name: 'New User',
      email: 'test@email.com',
      created_at: '2020-07-08T20:22:25.443Z',
      updated_at: '2020-07-08T20:22:25.443Z',
      avatar_url: null,
    },
  }).as('create-user')

  cy.route({
    method: 'PUT',
    url: '/profile',
    headers: {
      authorization: 'token_mocked',
    },
    response: {
      id: '59ab588f-9b26-4f6c-89f9-773ce7ceb877',
      name: 'John Doe',
      email: 'teste1593309083526@email.com',
      avatar: null,
      created_at: '2020-06-28T01:51:26.199Z',
      updated_at: '2020-06-28T01:51:26.199Z',
      avatar_url: null,
    },
  })
}

export default setupMockServices
