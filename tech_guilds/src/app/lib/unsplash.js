//function to fetch photos from unsplash API
export const fetchPhotos = async (page = 1, perPage = 10) => {
    const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;  // limit scope by adding this line into function, retrieving from the env file
    const url = `https://api.unsplash.com/photos?client_id=${accessKey}&page=${page}&per_page=${perPage}`; //api endpoint url
  
    try {
        //fetch operation to unsplash API and check if fetch was successful or throw error 
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
        //logging errors for easier debugging
      console.error("Error fetching photos:", error);
      throw error;  // throw again after logging or handle as needed
    }
  };
  