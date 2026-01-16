import { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

function FamilyTreePage() {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/family-tree`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTreeData(data))
      .catch(console.error);
  }, []);

  if (!treeData) {
    return <p>Loading family tree…</p>;
  }

  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={{ x: 400, y: 100 }}
        zoomable
        collapsible
      />
    </div>
  );
}

export default FamilyTreePage;
