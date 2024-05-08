export async function loginTeacher(user) {

    try {
        const response = await fetch('http://localhost:6001/teacher/login', {
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

export async function updatePassword(info) {

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:6001/teacher/updatepass', {
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

export async function updateTeacher(info) {

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:6001/teacher/update', {
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

export async function getInfoTeacher(info) {
  try {
    const response = await fetch('http://localhost:6001/teacher/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teacher_id: info }),
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