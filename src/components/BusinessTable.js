import { Card, Typography } from "@material-tailwind/react";
import '../styles/BusinessTable.css'

const TABLE_HEAD = ["Id", "Business Name", "Business email","Status"];

const TABLE_ROWS = [
    {
        id : 1,
        name : "Dev Team Test",
        email : "devteamtest@xyz.com",
        status : "on"
    },
];

export function Table() {
    return (
    <div class = "table-container">
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
            <thead>
                <tr>
                {TABLE_HEAD.map((head) => (
                    <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                    >
                        {head}
                    </Typography>
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {TABLE_ROWS.map(({ id, name, email,status }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                    <tr key={id}>
                    <td className={classes}>
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        >
                        {id}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        >
                        {name}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        >
                        {email}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        >
                        {status}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        >
                        Edit
                        </Typography>
                    </td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </Card>
    </div>
    );
  }
  
export default Table;