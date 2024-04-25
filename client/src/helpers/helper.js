export async function getAllCourse() {
    try {
        const response = await fetch('http://localhost:6001/courses');
        const data = await response.json();
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function getDetailCourse() {
    try {
        const response = await fetch('http://localhost:6001/coursesde');    
        const data = await response.json();
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}