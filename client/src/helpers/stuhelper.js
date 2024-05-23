export async function getStudent() {
    try {
        const response = await fetch('http://localhost:6001/oa/students');
        const data = await response.json();
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
    const [department_id, year, student_id] = token.split('-');

    const response = await fetch('http://localhost:6001/student/registerinfo', {
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

export async function updatePassword(info) {

    try {
        const token = localStorage.getItem('token');
        const [department_id, year, student_id] = token.split('-');
        const response = await fetch('http://localhost:6001/student/update/password', {
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
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/getscholarship', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${student_id}`,
      },
      body: JSON.stringify(),
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


// not finished
export async function getAvgScholar() {
  try {
    const response = await fetch('http://localhost:6001/student/getavgscholar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
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

export async function getStutusScholar(selY, enYear) {
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/getstatusscholar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${student_id}`,
      },
      body: JSON.stringify({ year : selY, enYear : enYear }),
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

export async function getActivity() {
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/getactivity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${student_id}`,
      },
      body: JSON.stringify(),
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

export async function getFacActivity(id) {
  try {
    const response = await fetch('http://localhost:6001/student/getfacactivity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activity_id : id }),
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

export async function getArrActivity(info, id) {
  try {
    const response = await fetch('http://localhost:6001/student/getarractivity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${id}`,
      },
      body: JSON.stringify({ evaluate : info }),
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

export async function evaActivity(info, id) {
  try {
    const response = await fetch('http://localhost:6001/student/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${id}`,
      },
      body: JSON.stringify({ evaluate : info }),
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

export async function getInfo() {
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ student_id: student_id }),
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

export async function getStuTerm(info, year) {
  try {
    const response = await fetch('http://localhost:6001/student/getstuterm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ student_id: info, year : year  }),
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

export async function getGpax() {
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/getgpax', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ student_id: student_id }),
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

export async function getTotalCredit() {
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/gettotalcredit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ student_id: student_id }),
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

export async function getStuRegister(selT, selY) {
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/getsturegister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${student_id}`,
      },
      body: JSON.stringify({ term : selT, year: selY }),
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

export async function getStuRegisterDel(term) {
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/getsturegister/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${student_id}`,
      },
      body: JSON.stringify({ term : term, year : year }),
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

export async function getStuRegisterChange(term) {
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/getsturegister/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${student_id}`,
      },
      body: JSON.stringify({ term : term, year : year }),
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

// sent term year course_id, group
export async function delStuCourse(info) {
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/delete/course', {
      method: 'DELETE',
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

// sent term year course_id, old group, new group
export async function changeGroup(info, year, term) {
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/update/group', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${student_id}`,
      },
      body: JSON.stringify({ update : info, year : year, term : term }),
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

export async function getCourseDe() {
  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/getcoursede', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${student_id}`,
      },
      body: JSON.stringify({ department_id: department_id, year: year }),
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

export async function getSelCourse(id) {
  try {
    const response = await fetch('http://localhost:6001/student/getselcourse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id : id }),
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
      courses.push({ student_id: id, year: year, gr: info[i].gr, 
                      term: term, course_id: info[i].course_id, credit: info[i].credit });
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
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function registerScholar(data, info) {
  const application = {
    student_id: data.student_id,
    get_year: data.year,
    scholarship_id: info.scholarship_id,
  }

  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/register/scholarship', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${student_id}`,
      },
      body: JSON.stringify({ apply : application, info : info }),
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

export async function registerActivity(activity_id, student_id) {
  const arr = {
    student_id: student_id,
    activity_id: activity_id,
  }

  try {
    const token = localStorage.getItem('token');
    const [department_id, year, student_id] = token.split('-');
    const response = await fetch('http://localhost:6001/student/register/activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${student_id}`,
      },
      body: JSON.stringify({ arr_activity : arr }),
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