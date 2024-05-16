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

export async function registerInfomation(info) {
  const { date, month, year } = info;
  if (date) {
    const dob = `${year}-${month}-${date}`;
    info = {
      ...info,
      'dob': dob,
    }
  }
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:6001/teacher/registerinfo', {
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

export async function getCourseTeacher(info) {
  try {
    const response = await fetch('http://localhost:6001/teacher/course/getcourse', {
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

export async function editCourse(info, id) {
  try {
    const response = await fetch('http://localhost:6001/teacher/editcourse', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ info: info, course_id: id }),
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

export async function getStuTeacher(info, id) {
  try {
    const response = await fetch('http://localhost:6001/teacher/course/getstudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teacher_id: info, course_id: id }),
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

export async function updateGrade(info, term) {
  console.log(info);
  console.log(term);
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:6001/teacher/updategrade', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ list: info, term: term }),
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