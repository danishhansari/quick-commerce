DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE table_name = 'inventories' 
          AND constraint_name = 'inventories_sku_unique'
          AND constraint_type = 'UNIQUE'
    ) THEN
        ALTER TABLE "inventories" 
        ADD CONSTRAINT "inventories_sku_unique" UNIQUE("sku");
    END IF;
END $$;
