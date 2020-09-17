import { useState } from "react";

export const useSignal = () => useState<any>()[1];