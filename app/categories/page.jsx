import Link from 'next/link';

const categories = [
  { id: 'general-knowledge', name: 'Cultură Generală' },
  { id: 'science', name: 'Știință' },
  { id: 'history', name: 'Istorie' },
];

const Categories = () => {
  return (
    <div>
      <h1>Categorii Quiz</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/quiz/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
