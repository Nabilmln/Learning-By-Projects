function RepositoryCard({ repo }) {
  return (
    <div className="repo-card">
      <h2>{repo.name}</h2>
      <p className="description">{repo.description}</p>
      <div className="repo-stats">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>🐛 {repo.open_issues_count}</span>
      </div>
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        View Repository
      </a>
    </div>
  );
}

export default RepositoryCard;
