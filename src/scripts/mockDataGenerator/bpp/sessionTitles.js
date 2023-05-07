'use strict'

const titles = [
	'Effective Classroom Management',
	'Blended Learning Strategies',
	'Building Strong Teacher-Parent Relationships',
	'Innovative Approaches to Student Assessment',
	'Teaching Critical Thinking Skills',
	'Building a Positive Classroom Culture',
	'Differentiated Instruction Techniques',
	'Strategies for Student Engagement',
	'Developing Inclusive Curriculum',
	'Effective Lesson Planning',
	'Collaborative Teaching Techniques',
	'Innovative Approaches to Teaching Writing',
	'Effective Grading and Feedback Strategies',
	'Assistive Technology for Students with Disabilities',
	'Integrating Social Emotional Learning in the Classroom',
	'Teaching Multiculturalism and Diversity',
	'Managing Classroom Behavior for Special Education',
	'Creating a Positive Learning Environment',
	'Teaching Strategies for ESL Students',
	'Effective Parent-Teacher Conferences',
	'Integrating STEM Education',
	'Effective Teaching for Gifted and Talented Students',
	'Project-Based Learning Techniques',
	'Developing Effective Study Habits',
	'Creating Engaging Online Learning Experiences',
	'Innovative Approaches to Teaching Math',
	'Teaching Mindfulness to Students',
	'Strategies for Developing Effective Writing Skills',
	'Teaching Strategies for Visual Learners',
	'Effective Teaching for Students with ADHD',
	'Building Positive School-Community Partnerships',
	'Innovative Approaches to Teaching Science',
	'Effective Classroom Assessment Techniques',
	'Teaching Strategies for Students with Dyslexia',
	'Incorporating Movement and Physical Activity in the Classroom',
	'Teaching Strategies for Students with Autism Spectrum Disorder',
	'Differentiated Instruction for Students with Learning Disabilities',
	'Teaching Strategies for Students with Emotional Disturbances',
	'Creating Inclusive Learning Spaces for Students',
	'Innovative Approaches to Teaching History',
	'Teaching Digital Citizenship Skills',
	'Effective Differentiation for English Language Learners',
	'Teaching Strategies for Students with Executive Functioning Challenges',
	'Building Positive School Culture and Climate',
	'Innovative Approaches to Teaching Social Studies',
	'Teaching Strategies for Students with Hearing Impairments',
	'Effective Teaching for Students with Speech and Language Disorders',
	'Incorporating Cultural Competency in Teaching',
	'Teaching Strategies for Students with Visual Impairments',
	'Leading Curriculum Development',
	'Innovative Approaches to Educational Technology',
	'Building Effective School-Community Partnerships',
	'Effective Grant Writing for Education',
	'Developing Effective School Improvement Plans',
	'Managing Education Budgets and Resources',
	'Effective Data-Driven Decision Making in Education',
	'Building and Leading Effective Educational Teams',
	'Innovative Approaches to Education Research',
	'Effective Education Policy Advocacy',
	'Managing Education Programs for Non-Profit Organizations',
	'Innovative Approaches to Education Assessment and Evaluation',
	'Effective Education Program Evaluation',
	'Leadership and Strategic Planning in Education',
	'Building and Managing Effective Educational Partnerships',
	'Effective Educational Resource Allocation',
	'Managing Distance Learning Programs',
	'Innovative Approaches to Adult Education',
	'Effective Higher Education Administration',
	'Building and Leading Effective Educational Collaborations',
	'Innovative Approaches to Early Childhood Education',
	'Effective Education Program Development and Implementation',
	'Managing Education Programs for Government Organizations',
	'Innovative Approaches to Educational Equity and Access',
	'Effective Education Marketing and Communications',
	'Leading Education Research and Development',
	'Building and Managing Effective Educational Networks',
	'Innovative Approaches to Education Policy',
	'Effective Education Advocacy Strategies',
	'Managing Education Programs for International Organizations',
	'Innovative Approaches to Education Data Analysis',
	'Effective Education Program Monitoring and Evaluation',
	'Leading Education Technology Integration',
	'Building and Managing Effective Educational Coalitions',
	'Innovative Approaches to Education Leadership',
	'Effective Education Public Relations Strategies',
	'Managing Education Programs for Foundations',
	'Innovative Approaches to Education Program Design',
	'Effective Education Budget Planning and Management',
	'Leading Education Curriculum Alignment',
	'Building and Managing Effective Educational Alliances',
	'Innovative Approaches to Education Research and Evaluation',
	'Effective Education Project Management',
	'Managing Education Programs for Non-Governmental Organizations',
	'Innovative Approaches to Education Funding',
	'Effective Education Partnership Development',
	'Leading Education Data Analysis and Reporting',
	'Building and Managing Effective Educational Initiatives',
	'Designing Effective School Facilities',
	'Innovative Approaches to School Safety and Security',
	'Creating Healthy Learning Environments',
	'Designing Effective Learning Spaces',
	'Innovative Approaches to Student Health and Wellness',
	'Creating Inclusive School Environments',
	'Building Effective Partnerships with Families and Communities',
	'Innovative Approaches to Student Support Services',
	'Creating Positive School Cultures',
	'Designing Effective Learning Technologies',
	'Innovative Approaches to Inclusive Education',
	'Creating Effective Classroom Spaces',
	'Building Effective School-Community Relationships',
	'Innovative Approaches to Student Behavior Management',
	'Creating Effective Learning Communities',
	'Designing Effective Special Education Programs',
	'Innovative Approaches to Parent and Community Engagement',
	'Creating Engaging Learning Spaces',
	'Building Effective School Health Programs',
	'Innovative Approaches to Classroom Management',
	'Creating Supportive Learning Environments',
	'Designing Effective Early Childhood Education Spaces',
	'Innovative Approaches to Mental Health Support for Students',
	'Creating Safe Learning Environments',
	'Building Effective School Nutrition Programs',
	'Innovative Approaches to Student Engagement and Motivation',
	'Creating Collaborative Learning Spaces',
	'Designing Effective Physical Education Programs',
	'Innovative Approaches to Student Achievement',
	'Creating Inclusive Classroom Spaces',
	'Building Effective School Counseling Programs',
	'Innovative Approaches to Student Discipline',
	'Creating Effective Learning Spaces for Students with Disabilities',
	'Designing Effective Art and Music Education Programs',
	'Innovative Approaches to Student Assessment and Evaluation',
	'Creating Effective Learning Spaces for English Language Learners',
	'Building Effective School Transportation Programs',
	'Innovative Approaches to School Discipline',
	'Creating Effective Learning Spaces for Gifted and Talented Students',
	'Designing Effective Career and Technical Education Programs',
	'Innovative Approaches to Student Leadership Development',
	'Creating Effective Learning Spaces for Students with Emotional and Behavioral Disorders',
	'Building Effective School Library Programs',
	'Innovative Approaches to Student Learning and Development',
	'Creating Effective Learning Spaces for Students with Learning Disabilities',
	'Designing Effective Science and Technology Education Programs',
	'Innovative Approaches to Student Success and Achievement',
	'Creating Effective Learning Spaces for Students with Autism Spectrum Disorder',
	'Building Effective School Athletics Programs',
	'Innovative Approaches to Student Engagement and Participation',
	'Creating Effective Learning Spaces for Students with Attention Deficit Hyperactivity Disorder',
	'Designing Effective Social Studies Education Programs',
	'Innovative Approaches to Student Motivation and Learning Strategies',
	'Creating Effective Learning Spaces for Students with Hearing and Vision Impairments',
	'The Fundamentals of Mathematics',
	'The Basics of English Grammar',
	'Introduction to Biology',
	'The Essentials of Chemistry',
	'An Overview of Physics',
	'History of the United States',
	'The Foundations of World History',
	'Civics and Government',
	'An Introduction to Geography',
	'The Fundamentals of Economics',
	'Introduction to Psychology',
	'The Elements of Sociology',
	'Anthropology: Understanding Human Cultures',
	'Ethics and Morality in Society',
	'The Science of Climate Change',
	'Understanding Environmental Science',
	'The Science of Energy and Sustainability',
	'Introduction to Astronomy',
	'Introduction to Earth Science',
	'The Science of Evolution',
	'An Overview of Genetics',
	'The Science of Nutrition and Health',
	'An Introduction to Physiology',
	'The Essentials of Anatomy',
	'Understanding Microbiology',
	'An Introduction to Forensic Science',
	'Introduction to Computer Science',
	'The Basics of Programming',
	'Introduction to Web Design',
	'The Science of Data Analytics',
	'An Overview of Artificial Intelligence',
	'The History of Art',
	'Introduction to Drawing and Painting',
	'The Art of Photography',
	'An Overview of Music History',
	'Introduction to Music Theory',
	'The Art of Film and Video Production',
	'Introduction to Theater and Drama',
	'The History of Dance',
	'An Introduction to Creative Writing',
	'The Essentials of Journalism',
	'The Art of Public Speaking',
	'An Overview of Philosophy',
	'The Basics of Critical Thinking',
	'An Introduction to Logic',
	'The Foundations of Ethics',
	'Introduction to World Religions',
	'The Essentials of Mythology',
	'The Science of Climate Change',
]

console.log(titles.length)

const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

exports.sessionTitles = shuffleArray(titles)