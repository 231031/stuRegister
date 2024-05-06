export async function getStudent() {

    try {
        const response = await fetch('http://localhost:6001/oa/students');
        const data = await response.json();
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

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
        const [department_id, year, student_id] = token.split('-');
        const response = await fetch('http://localhost:6001/student/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${student_id}`,
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

export async function getScholar() {
  try {
    const response = await fetch('http://localhost:6001/student/scholarship');
    const data = await response.json();
    if (response.status === 404) {
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

export async function getStuRegister(de, year) {
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/getsturegister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${student_id}`,
      },
      body: JSON.stringify({ department_id: de, year: year }),
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

export async function getAvailableCourse(de, year, type) {
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/getavailable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${student_id}`,
      },
      body: JSON.stringify({ department_id: de, year: year, type: type }),
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

export async function registerCourse(info, year, id) {
  const courses = [];
  const month = new Date().getMonth();
  let term = 2;
  if (month >= 7) term = 1;
  for (let i = 0; i < info.length; i++) {
      courses.push({ student_id: id, year: year, group: info[i].group, 
                      term: term, course_id: info[i].course_id });
  }
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/register/course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${student_id}`,
      },
      body: JSON.stringify({ regis : courses }),
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


// not test
export async function registerScholar(data, info) {
  const application = {
    student_id: data.student_id,
    getYear: data.year,
    scholarship_id: info.scholarship_id,
  }

  // try {
  //   const token = localStorage.getItem('token');
  //   const [department_id, year, student_id] = token.split('-');
  //   const response = await fetch('http://localhost:6001/student/register/scholarship', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Authorization": `Bearer ${student_id}`,
  //     },
  //     body: JSON.stringify({ apply : application, info : info }),
  //   });
  //   const data = await response.json();
  //   if (response.status === 404) {
  //     console.log(data);
  //     return Promise.reject(data);
  //   }
  //   return Promise.resolve(data);
  // } catch (error) {
  //   return Promise.reject(error);
  // }
}