import React from 'react';
import MaterialTable from 'material-table';


export default function DataTableFilter() {

  return (
    <div style={{ maxWidth: '100%' }}>
                <MaterialTable
        title=""
        
        columns={[
          { title: 'Num compte', field: 'Num_compte' },
          { title: 'Email', field: 'Email' },
          { title: 'Nom complet', field: 'Nom_complet' },
          {
            title: 'Telephone',
            field: 'Telephone',
          },
        ]}
        data={[
          { Num_compte: 323121, Email: 'Baran@exvivo.com', Nom_complet: "Baran Andy", Telephone: '0648372384' },
          { Num_compte: 332143, Email: 'Zerya@exvivo.cloud', Nom_complet: "Zerya Beut", Telephone: '053293434' },
        ]}        
        options={{
          filtering: true,
          pageSizeOptions: [5,8]
        }}
      />
      </div>
  );
}