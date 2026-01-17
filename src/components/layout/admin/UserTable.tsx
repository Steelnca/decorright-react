import Table from "@/components/ui/DataTable";

const columns = [
    { key: 'id', title: 'ID', searchable: true },
    { key: 'full_name', title: 'Full Name', searchable: true },
    { key: 'email', title: 'Email', searchable: true },
    { key: 'phone', title: 'Phone', searchable: true, render: (row:any) => (
        <div className="flex items-center gap-2">
            <span> {row.phone} </span>
            {row.phone_verified
            ?(<span className="px-1.5 py-0.5 text-2xs font-medium min-w-max whitespace-nowrap rounded-full phone-verified"> Verified </span>)
            : (<span className="px-1.5 py-0.5 text-2xs font-medium min-w-max whitespace-nowrap rounded-full phone-not-verified"> Not Verified </span>)
            }
        </div>
    )},
    { key: 'role', title: 'Role' },
    { key: 'joined_at', title: 'Joined at' },
];

const data = [
    { id: '9541654567', full_name: 'Sunny Humphrey', email: 'example@gmail.com', phone:'0123456789', phone_verified: true, role: 'Client', joined_at: 'Jan 16, 2026'},
    { id: '9541654568', full_name: 'John Doe', email: 'john.doe@gmail.com', phone:'0123456789', phone_verified: true, role: 'Client', joined_at: 'Jan 16, 2026'},
    { id: '9541654569', full_name: 'Roland Johnson', email: 'roland.johnson@gmail.com', phone:'0123456789', phone_verified: false, role: 'Client', joined_at: 'Jan 16, 2026'},
    { id: '9541654570', full_name: 'Gavin Pace', email: 'gavin.pace@gmail.com', phone:'0123456789', phone_verified: true, role: 'Client', joined_at: 'Jan 16, 2026'},
    { id: '9541654571', full_name: 'Charles Bonilla', email: 'charles.bonilla@gmail.com', phone:'0123456789', phone_verified: true, role: 'Client', joined_at: 'Jan 16, 2026'},
    { id: '9541654572', full_name: 'Damari Marin', email: 'damari.marin@gmail.com', phone:'0123456789', phone_verified: false, role: 'Client', joined_at: 'Jan 16, 2026'},
    { id: '9541654573', full_name: 'Ellis Conner', email: 'ellis.conner@gmail.com', phone:'0123456789', phone_verified: true, role: 'Client', joined_at: 'Jan 16, 2026'},
    { id: '9541654567', full_name: 'Sunny Humphrey', email: 'example@gmail.com', phone:'0123456789', phone_verified: true, role: 'Client', joined_at: 'Jan 16, 2026'},
    { id: '9541654568', full_name: 'John Doe', email: 'john.doe@gmail.com', phone:'0123456789', phone_verified: false, role: 'Client', joined_at: 'Jan 16, 2026'},
    { id: '9541654569', full_name: 'Roland Johnson', email: 'roland.johnson@gmail.com', phone:'0123456789', phone_verified: true, role: 'Client', joined_at: 'Jan 16, 2026'},
    { id: '9541654570', full_name: 'Gavin Pace', email: 'gavin.pace@gmail.com', phone:'0123456789', phone_verified: true, role: 'Client', joined_at: 'Jan 16, 2026'},
    { id: '9541654571', full_name: 'Charles Bonilla', email: 'charles.bonilla@gmail.com', phone:'0123456789', phone_verified: true, role: 'Client', joined_at: 'Jan 16, 2026'},
    { id: '9541654572', full_name: 'Damari Marin', email: 'damari.marin@gmail.com', phone:'0123456789', phone_verified: false, role: 'Client', joined_at: 'Jan 16, 2026'},
    { id: '9541654573', full_name: 'Ellis Conner', email: 'ellis.conner@gmail.com', phone:'0123456789', phone_verified: true, role: 'Client', joined_at: 'Jan 16, 2026'},
];




export default function UserTable(){
    return (
      <Table columns={columns} data={data} options={{
              selectable: true, filterOptions: [
                  { label: 'Red', value: 'red' },
                  { label: 'Blue', value: 'blue' },
              ],
              filterField: 'color',
              renderActions: () => (
                  <div className="flex flex-col gap-2 w-full">
                      <button className="px-2 py-1 w-full text-sm text-start">Edit</button>
                      <button className="px-2 py-1 w-full text-sm text-start">Delete</button>
                      <button className="px-2 py-1 w-full text-sm text-start">Manage</button>
                  </div>
              ),
              bulkActions: [
                  { label: 'Delete', onClick: (selected) => console.log('delete', selected) },
                  { label: 'Export', onClick: (selected) => console.log('export', selected) },
              ],
              onSelectionChange: (selected) => console.log('selected rows', selected),
              searchPlaceholder: 'Search by names or ids',
          }}
      />

    );
}