import React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { CreateRequestItem } from "./CreateRequestItem";
import { IFilterRequest } from "../types/IFilterRequest";

interface DndRequestsProps {
  initialData: any;
}

const DndRequests: React.FC<DndRequestsProps> = ({ initialData }) => {
  const [data, setData] = React.useState<IFilterRequest[]>(initialData);

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...data];

      const sourceIndex = source.index;
      const destinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinatonIndex, 0, removedStore);

      return setData(reorderedStores);
    }

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    const itemSourceIndex = data.findIndex((item) => item.name === source.droppableId);
    const itemDestinationIndex = data.findIndex(
      (item) => item.name === destination.droppableId
    );

    const newSourceItems = [...(data[itemSourceIndex].list ?? [])];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...(data[itemDestinationIndex].list ?? [])]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(sourceIndex, 1);
    newDestinationItems.splice(destinationIndex, 0, deletedItem);

    const newData = [...data];

    newData[itemSourceIndex] = {
      ...data[itemSourceIndex],
      list: newSourceItems,
    };
    newData[itemDestinationIndex] = {
      ...data[itemDestinationIndex],
      list: newDestinationItems,
    };

    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* outer droppable zone */}
      <Droppable droppableId="root-dnd-droppable-zone" type="group">
        {(providedDroppable) => (
          <div {...providedDroppable.droppableProps} ref={providedDroppable.innerRef}>
            {data.map((item, index) => (
              /* top-level filters and groups */
              <Draggable key={item.name} draggableId={item.name} index={index}>
                {(providedDraggable) => (
                  /* droppable zone for groups */
                  <Droppable droppableId={item.name}>
                    {(providedDroppable) => (
                      <div
                        {...providedDroppable.droppableProps}
                        ref={providedDroppable.innerRef}>
                        {/* filter or group */}
                        <CreateRequestItem
                          request={item}
                          dndProps={{
                            ref: providedDraggable.innerRef,
                            draggableProps: providedDraggable.draggableProps,
                            draggableButtonProps: providedDraggable.dragHandleProps,
                          }}
                        />

                        {providedDroppable.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </Draggable>
            ))}
            {providedDroppable.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export { DndRequests };
