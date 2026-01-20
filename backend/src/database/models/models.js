//Profile Model
export class Profile {
  constructor(
    id,
    name,
    title,
    bio,
    profile_photo_url,
    cv_url,
    phone,
    whatsapp,
    email,
    linkedin,
    github,
    location,
    created_at,
    updated_at,
  ) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.bio = bio;
    this.profile_photo_url = profile_photo_url;
    this.cv_url = cv_url;
    this.phone = phone;
    this.whatsapp = whatsapp;
    this.email = email;
    this.linkedin = linkedin;
    this.github = github;
    this.location = location;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

//Education Model
export class Education {
  constructor(
    id,
    degree,
    university,
    location,
    start_date,
    end_date,
    description,
    created_at,
    updated_at,
  ) {
    this.id = id;
    this.degree = degree;
    this.university = university;
    this.location = location;
    this.start_date = start_date;
    this.end_date = end_date;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

//Work Experience Model
export class WorkExperience {
  constructor(
    id,
    position,
    company,
    location,
    start_date,
    end_date,
    description,
    created_at,
    updated_at,
  ) {
    this.id = id;
    this.position = position;
    this.company = company;
    this.location = location;
    this.start_date = start_date;
    this.end_date = end_date;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

//Project Model
export class Project {
  constructor(
    id,
    title,
    link,
    description,
    video_url,
    github_url,
    tags,
    created_at,
    updated_at,
  ) {
    this.id = id;
    this.title = title;
    this.link = link;
    this.description = description;
    this.video_url = video_url;
    this.github_url = github_url;
    this.tags = tags || [];
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

//Skill Model
export class Skill {
  constructor(id, type, name, created_at) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.created_at = created_at;
  }
}

//Course Model
export class Course {
  constructor(
    id,
    title,
    start_date,
    end_date,
    link,
    description,
    created_at,
    updated_at,
  ) {
    this.id = id;
    this.title = title;
    this.start_date = start_date;
    this.end_date = end_date;
    this.link = link;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
