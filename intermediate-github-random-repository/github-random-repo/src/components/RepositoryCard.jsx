function RepositoryCard({ repo }) {
  return (
    <div>
        <h2>{repo.name}</h2>
        <p>{repo.description}</p>
        <p>⭐ {repo.stargazers_count}</p>
        <p>🍴 {repo.forks_count}</p>
        <p>🐛 {repo.open_issues_count}</p>
    </div>
  );
}

export default RepositoryCard;
