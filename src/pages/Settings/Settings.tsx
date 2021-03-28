export const Settings: React.FC = () => {
  return (
    <div>
      <h1>Settings</h1>
      <div>
        <label>Show buttons complex and remove</label>
        <input type="checkbox" />
      </div>
      <div>
        <label> Show translation of the studied word</label>
        <input type="checkbox" />
      </div>
      <div>
        <label>Show translation text</label>
        <input type="checkbox" />
      </div>
    </div>
  );
};
