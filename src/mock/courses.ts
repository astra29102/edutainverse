import { Course } from '../types';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    slug: 'machine-learning-fundamentals',
    description: 'A comprehensive introduction to machine learning concepts, algorithms, and practical applications. This course covers supervised and unsupervised learning, neural networks, and model evaluation techniques.',
    shortDescription: 'Learn the foundations of machine learning algorithms and applications',
    coverImage: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 49.99,
    duration: 1800, // 30 hours
    level: 'intermediate',
    educatorId: '101',
    educatorName: 'Dr. Robert Miller',
    status: 'approved',
    tags: ['Machine Learning', 'AI', 'Python', 'Data Science'],
    enrolledStudents: 325,
    rating: 4.8,
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Machine Learning',
        description: 'Basic concepts and terminology in machine learning',
        order: 1,
        videos: [
          {
            id: 'v1',
            title: 'What is Machine Learning?',
            description: 'Introduction to the field and its applications',
            youtubeId: 'HcqpanDadyQ',
            duration: 12,
            order: 1
          },
          {
            id: 'v2',
            title: 'Types of Machine Learning',
            description: 'Overview of supervised, unsupervised, and reinforcement learning',
            youtubeId: 'YY7dGFsnGFY',
            duration: 15,
            order: 2
          }
        ]
      },
      {
        id: 'm2',
        title: 'Supervised Learning Algorithms',
        description: 'Comprehensive look at key supervised learning approaches',
        order: 2,
        videos: [
          {
            id: 'v3',
            title: 'Linear Regression',
            description: 'Understanding the basics of linear regression models',
            youtubeId: 'CtsRRUY94qw',
            duration: 20,
            order: 1
          },
          {
            id: 'v4',
            title: 'Classification with Decision Trees',
            description: 'How decision trees work and their applications',
            youtubeId: 'ZVR2Way4nwQ',
            duration: 18,
            order: 2
          }
        ]
      }
    ],
    createdAt: '2023-01-20T14:30:00Z',
    updatedAt: '2023-05-15T09:45:00Z'
  },
  {
    id: '2',
    title: 'Business Strategy Masterclass',
    slug: 'business-strategy-masterclass',
    description: 'This course provides a deep dive into business strategy formulation and implementation. Learn how to analyze markets, identify competitive advantages, and develop effective strategic plans for various business contexts.',
    shortDescription: 'Master the art of strategic business planning and execution',
    coverImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 59.99,
    duration: 1200, // 20 hours
    level: 'advanced',
    educatorId: '102',
    educatorName: 'Prof. Jennifer Lee',
    status: 'approved',
    tags: ['Business', 'Strategy', 'Management', 'MBA'],
    enrolledStudents: 412,
    rating: 4.9,
    modules: [
      {
        id: 'm1',
        title: 'Strategic Analysis Frameworks',
        description: 'Key frameworks for analyzing business environments',
        order: 1,
        videos: [
          {
            id: 'v1',
            title: 'SWOT Analysis Explained',
            description: 'How to conduct effective SWOT analyses',
            youtubeId: 'I_6AVRGLXGA',
            duration: 14,
            order: 1
          },
          {
            id: 'v2',
            title: 'Porter\'s Five Forces Model',
            description: 'Understanding competitive forces in your industry',
            youtubeId: 'ZV9DM8UM9LU',
            duration: 17,
            order: 2
          }
        ]
      },
      {
        id: 'm2',
        title: 'Competitive Advantage',
        description: 'Building and sustaining competitive advantages',
        order: 2,
        videos: [
          {
            id: 'v3',
            title: 'Types of Competitive Advantage',
            description: 'Differentiation, cost leadership, and focus strategies',
            youtubeId: 'eJ5EwLF9uIw',
            duration: 19,
            order: 1
          },
          {
            id: 'v4',
            title: 'Creating Value Propositions',
            description: 'How to craft compelling value propositions',
            youtubeId: 'yxQ0_9djZbM',
            duration: 16,
            order: 2
          }
        ]
      }
    ],
    createdAt: '2023-02-25T11:20:00Z',
    updatedAt: '2023-06-10T13:15:00Z'
  },
  {
    id: '3',
    title: 'Modern Web Development with React',
    slug: 'modern-web-development-with-react',
    description: 'Master React.js and build modern, responsive web applications. This course covers React fundamentals, hooks, context API, state management with Redux, and integrating with backend services.',
    shortDescription: 'Learn to build dynamic web applications with React.js',
    coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 44.99,
    duration: 1500, // 25 hours
    level: 'intermediate',
    educatorId: '103',
    educatorName: 'Alex Thompson',
    status: 'approved',
    tags: ['Web Development', 'React', 'JavaScript', 'Frontend'],
    enrolledStudents: 587,
    rating: 4.7,
    modules: [
      {
        id: 'm1',
        title: 'React Fundamentals',
        description: 'Core concepts of React.js',
        order: 1,
        videos: [
          {
            id: 'v1',
            title: 'Introduction to React',
            description: 'Understanding React and its component-based architecture',
            youtubeId: 'hQAHSlTtcmY',
            duration: 15,
            order: 1
          },
          {
            id: 'v2',
            title: 'Creating and Using Components',
            description: 'Building reusable React components',
            youtubeId: 'Y2hgEGPzTZY',
            duration: 18,
            order: 2
          }
        ]
      },
      {
        id: 'm2',
        title: 'State Management',
        description: 'Managing state in React applications',
        order: 2,
        videos: [
          {
            id: 'v3',
            title: 'useState and useEffect Hooks',
            description: 'Managing component state with hooks',
            youtubeId: 'O6P86uwfdR0',
            duration: 22,
            order: 1
          },
          {
            id: 'v4',
            title: 'Context API for Global State',
            description: 'Using Context to avoid prop drilling',
            youtubeId: 'XkBB3pPY3t8',
            duration: 20,
            order: 2
          }
        ]
      }
    ],
    createdAt: '2023-03-15T10:45:00Z',
    updatedAt: '2023-07-05T14:30:00Z'
  },
  {
    id: '4',
    title: 'Introduction to Psychology',
    slug: 'introduction-to-psychology',
    description: 'Explore the human mind and behavior with this comprehensive introduction to psychology. Learn about cognitive processes, personality theories, psychological disorders, and therapeutic approaches.',
    shortDescription: 'Discover the fascinating world of human psychology',
    coverImage: 'https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 39.99,
    duration: 1320, // 22 hours
    level: 'beginner',
    educatorId: '104',
    educatorName: 'Dr. Maya Patel',
    status: 'approved',
    tags: ['Psychology', 'Mental Health', 'Neuroscience', 'Behavior'],
    enrolledStudents: 498,
    rating: 4.6,
    modules: [
      {
        id: 'm1',
        title: 'Foundations of Psychology',
        description: 'Basic concepts and history of psychological science',
        order: 1,
        videos: [
          {
            id: 'v1',
            title: 'What is Psychology?',
            description: 'The science of mind and behavior',
            youtubeId: 'vo4pMVb0R6M',
            duration: 14,
            order: 1
          },
          {
            id: 'v2',
            title: 'Historical Perspectives',
            description: 'Major schools of thought in psychology',
            youtubeId: 'RJz4dGlj4uY',
            duration: 16,
            order: 2
          }
        ]
      },
      {
        id: 'm2',
        title: 'Cognitive Psychology',
        description: 'How we think, remember, and perceive',
        order: 2,
        videos: [
          {
            id: 'v3',
            title: 'Memory and Learning',
            description: 'How we form and retrieve memories',
            youtubeId: 'TUoJc0NPajQ',
            duration: 19,
            order: 1
          },
          {
            id: 'v4',
            title: 'Problem Solving and Decision Making',
            description: 'Cognitive processes in reasoning',
            youtubeId: 'UBVV8pch1dM',
            duration: 17,
            order: 2
          }
        ]
      }
    ],
    createdAt: '2023-04-10T09:15:00Z',
    updatedAt: '2023-08-20T11:40:00Z'
  },
  {
    id: '5',
    title: 'Data Science for Beginners',
    slug: 'data-science-for-beginners',
    description: 'Start your journey in data science with this beginner-friendly course. Learn about data collection, cleaning, analysis, and visualization using Python and popular data science libraries.',
    shortDescription: 'Begin your data science career with essential skills and tools',
    coverImage: 'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 34.99,
    duration: 1440, // 24 hours
    level: 'beginner',
    educatorId: '101',
    educatorName: 'Dr. Robert Miller',
    status: 'approved',
    tags: ['Data Science', 'Python', 'Statistics', 'Visualization'],
    enrolledStudents: 735,
    rating: 4.5,
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Data Science',
        description: 'Understanding the data science landscape',
        order: 1,
        videos: [
          {
            id: 'v1',
            title: 'What is Data Science?',
            description: 'Overview of the field and career opportunities',
            youtubeId: 'X3paOmcrTjQ',
            duration: 13,
            order: 1
          },
          {
            id: 'v2',
            title: 'The Data Science Process',
            description: 'Steps from question to insights',
            youtubeId: 'tS6UZtMoLGU',
            duration: 15,
            order: 2
          }
        ]
      },
      {
        id: 'm2',
        title: 'Data Analysis with Python',
        description: 'Using Python for data manipulation and analysis',
        order: 2,
        videos: [
          {
            id: 'v3',
            title: 'Introduction to Pandas',
            description: 'Working with data frames in Python',
            youtubeId: 'vmEHCJofslg',
            duration: 18,
            order: 1
          },
          {
            id: 'v4',
            title: 'Data Visualization with Matplotlib and Seaborn',
            description: 'Creating informative visualizations',
            youtubeId: '0P7QnIQDBJY',
            duration: 20,
            order: 2
          }
        ]
      }
    ],
    createdAt: '2023-05-05T12:30:00Z',
    updatedAt: '2023-09-12T10:20:00Z'
  },
  {
    id: '6',
    title: 'Digital Marketing Strategies',
    slug: 'digital-marketing-strategies',
    description: 'Master the essentials of digital marketing in this comprehensive course. Learn about SEO, content marketing, social media strategies, email campaigns, and analytics to drive business growth.',
    shortDescription: 'Learn effective digital marketing tactics for the modern business landscape',
    coverImage: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 54.99,
    duration: 1080, // 18 hours
    level: 'intermediate',
    educatorId: '102',
    educatorName: 'Prof. Jennifer Lee',
    status: 'approved',
    tags: ['Marketing', 'Digital', 'SEO', 'Social Media'],
    enrolledStudents: 623,
    rating: 4.7,
    modules: [
      {
        id: 'm1',
        title: 'Digital Marketing Fundamentals',
        description: 'Core concepts and channels in digital marketing',
        order: 1,
        videos: [
          {
            id: 'v1',
            title: 'The Digital Marketing Landscape',
            description: 'Overview of digital marketing channels and strategies',
            youtubeId: 'MYE0Vqp9j4A',
            duration: 16,
            order: 1
          },
          {
            id: 'v2',
            title: 'Creating a Digital Marketing Strategy',
            description: 'Building an effective marketing plan',
            youtubeId: 'hhjaQMg_WiU',
            duration: 19,
            order: 2
          }
        ]
      },
      {
        id: 'm2',
        title: 'Search Engine Optimization',
        description: 'Improving visibility in search engine results',
        order: 2,
        videos: [
          {
            id: 'v3',
            title: 'On-Page SEO Techniques',
            description: 'Optimizing your website content for search engines',
            youtubeId: 'cwcN8MaPUD0',
            duration: 17,
            order: 1
          },
          {
            id: 'v4',
            title: 'Off-Page SEO and Link Building',
            description: 'Building authority through backlinks',
            youtubeId: 'Nn8hI8V8n3c',
            duration: 15,
            order: 2
          }
        ]
      }
    ],
    createdAt: '2023-06-15T15:45:00Z',
    updatedAt: '2023-10-05T13:10:00Z'
  }
];

export const getCourseById = (id: string) => {
  return courses.find(course => course.id === id);
};

export const getCoursesByEducatorId = (educatorId: string) => {
  return courses.filter(course => course.educatorId === educatorId);
};

export const getEnrolledCourses = (courseIds: string[]) => {
  return courses.filter(course => courseIds.includes(course.id));
};