export async function getStudent() {

    try {
        const response = await fetch('http://localhost:6001/oa/students');
        const data = await response.json();
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

// export async function updateStudent(info) {

//     try {
//         const response = await fetch('http://localhost:6001/student/update', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(info),
//         });
//         const data = await response.json();
//         if (response.status === 404) {
//           console.log(data);
//           return Promise.reject(data);
//         }
//         return Promise.resolve(data);
//       } catch (error) {
//         return Promise.reject(error);
//       }
// }

export async function loginStudent(user) {

    try {
        const response = await fetch('http://localhost:6001/student/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if (response.status === 404) {
          console.log(data);
          return Promise.reject(data);
        }
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function updateStudent(info) {

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:6001/student/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(info),
        });
        const data = await response.json();
        if (response.status === 404) {
          console.log(data);
          return Promise.reject(data);
        }
        return Promise.resolve(data);
        
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function getInfo(info) {
  try {
    const response = await fetch('http://localhost:6001/student/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ student_id: info }),
    });
    const data = await response.json();
    if (response.status === 404) {
      console.log(data);
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}