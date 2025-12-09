import { useCard } from "@/hooks/useCard";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddCardDialog } from "@/components/cards/AddCardDialog";
import { EditCardDialog } from "@/components/cards/EditCardDialog";

export const CardList = () => {
  const { cards, loading, error, refetch } = useCard();

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-32">
          <p>Loading...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-32">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="ps-2">
          <h2 className="text-2xl font-bold">Business Cards</h2>
          <p className="text-sm text-muted-foreground">
            {cards.length} {cards.length === 1 ? "card" : "cards"} registered{" "}
          </p>
        </div>
        <AddCardDialog onSuccess={refetch} />
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((card) => (
              <TableRow key={card.id}>
                <TableCell className="font-medium">
                  {card.last_name} {card.first_name}
                </TableCell>
                <TableCell>{card.company}</TableCell>
                <TableCell>{card.department}</TableCell>
                <TableCell>{card.email}</TableCell>
                <TableCell>
                  <EditCardDialog card={card} onSuccess={refetch} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </Card>
    </div>
  );
};
