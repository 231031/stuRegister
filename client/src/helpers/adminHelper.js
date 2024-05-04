export async function login(info) {
    try {
        const response = await fetch('http://localhost:6001/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key : info }),
        });
        const data = await response.json();
        if (response.status === 404) {
          return Promise.reject(data);
        }
        console.log(data);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function addCourse(info) {
    console.log(info);
    try {
        const response = await fetch('http://localhost:6001/admin/addcourse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
        });
        const data = await response.json();
        if (response.status === 404) {
          return Promise.reject(data);
        }
        console.log(data);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function addAvailableCourse(info) {
    try {
        const response = await fetch('http://localhost:6001/admin/addavailable', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
        });
        const data = await response.json();
        if (response.status === 404) {
          return Promise.reject(data);
        }
        console.log(data);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function editCourse(info) {
    try {
        const response = await fetch('http://localhost:6001/admin/editcourse', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
        });
        const data = await response.json();
        if (response.status === 404) {
          return Promise.reject(data);
        }
        console.log(data);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function addDetail(info) {
    try {
        const response = await fetch('http://localhost:6001/admin/adddetail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
        });
        const data = await response.json();
        if (response.status === 404) {
          return Promise.reject(data);
      }
        console.log(data);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function addFaculty(info) {
    try {
        const response = await fetch('http://localhost:6001/admin/addfaculty', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
        });
        const data = await response.json();
        if (response.status === 404) {
          return Promise.reject(data);
      }
        console.log(data);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function addDepartment(info) {
    try {
      console.log(info);
        const response = await fetch('http://localhost:6001/admin/adddepartment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
        });
        const data = await response.json();
        if (response.status === 404) {
          return Promise.reject(data);
      }
        console.log(data);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function getDeInFac(info) {
    try {
        const response = await fetch('http://localhost:6001/admin/getdeinfac', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ faculty_id: info }),
        });
        const data = await response.json();
        if (response.status === 404) {
          return Promise.reject(data);
      }
        return Promise.resolve(data);
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
}

export async function addStudent(info) {
    const currentYear = ((new Date().getFullYear())+543) - 2500;

    function generateStudentId(year, department_id, index) {
      // Format: yyCPE0001
      const yearString = year.toString().slice(-2);
      return `${yearString}${department_id}${index.toString().padStart(3, '0')}`;
    }

    function generatePassword(length) {
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      return Array.from({ length }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join('');
    }
  
    const students = [];
    for (let i = 0; i < info.student.length; i++) {
        const pass = generatePassword(7);
        const studentId = generateStudentId(info.student[i].year, info.student[i].department_id, i+1);
        students.push({ student_id: studentId, password: pass, year: currentYear - info.student[i].year, 
                        firstName: info.student[i].firstName, lastName: info.student[i].lastName,
                        department_id: info.student[i].department_id, teacher_id: info.student[i].teacher_id });
    }

    try {
      console.log(info);
        const response = await fetch('http://localhost:6001/admin/addstudent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(students),
        });
        const data = await response.json();
        if (response.status === 404) {
          return Promise.reject(data);
      }
        console.log(data);
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function addTeacher(info) {

  function generatePassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join('');
  }

  const teachers = [];
    for (let i = 0; i < info.teacher.length; i++) {
        const pass = generatePassword(7);
        teachers.push({ teacher_id: info.teacher[i].teacher_id, password: pass,
                        firstName: info.teacher[i].firstName, lastName: info.teacher[i].lastName,
                        department_id: info.teacher[i].department_id, position: info.teacher[i].position });
    }

  try {
      const response = await fetch('http://localhost:6001/admin/addteacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teachers),
      });
      const data = await response.json();
      if (response.status === 404) {
        return Promise.reject(data);
    }
      console.log(data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
}

export async function getDeTeacher(info) {
  try {
      const response = await fetch('http://localhost:6001/admin/getdeteacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ department_id: info }),
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



